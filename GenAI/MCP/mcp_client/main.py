import asyncio
import json
import os
from dotenv import load_dotenv
from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain.agents import create_agent
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.messages import ToolMessage

load_dotenv()

model = ChatGoogleGenerativeAI(model="gemini-3.1-flash-lite")


async def main():
    client = MultiServerMCPClient(
        {
            "expense_tracker": {
                "transport": "http",
                "url": "https://mushahid-mcp-expense-tracker.fastmcp.app/mcp",
                # "url":"http://localhost:8000/mcp"
                "headers": {
                    "Authorization": f"Bearer {os.getenv('MCP_SERVER_API_KEY')}"
                },
            }
        }
    )

    tools = await client.get_tools()
    tools_by_name = {tool.name: tool for tool in tools}
    model_with_tool = model.bind_tools(tools)
    prompt = "summary of my expenses"
    response = await model_with_tool.ainvoke(prompt)


    if not getattr(response, "tool_calls", None):
        print("LLM Reply: ", response.content)
        return

    tool_messages = []
    for te in response.tool_calls:
        selected_tool = te["name"]
        selected_tool_args = te["args"] or {}
        selected_tool_id = te["id"]
        result = await tools_by_name[selected_tool].ainvoke(selected_tool_args)
        tool_messages.append(
            ToolMessage(tool_call_id=selected_tool_id, content=json.dumps(result))
        )

    final_response=await model_with_tool.ainvoke([prompt,response,*tool_messages])
    print(final_response)
        


if __name__ == "__main__":
    asyncio.run(main())
