from langchain_community import document_loaders

# loader=document_loaders.TextLoader('data.txt','utf-8')

# docs=loader.lazy_load()

# for doc in docs:
#     print(doc.page_content)


loader = document_loaders.WebBaseLoader(
    web_path="https://medium.com/@deepamathan/terraform-infrastructure-as-a-code-1dbf0f7ed3e1",
    show_progress=True
)
docs = loader.load()
print(docs)
