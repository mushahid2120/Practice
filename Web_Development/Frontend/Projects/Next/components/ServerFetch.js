
export default async function ServerFetch() {
    const response=await fetch('https://dummyjson.com/users/?_limit=10')
    const data= await response.json()
    console.log(data)
  return (
    <div>{JSON.stringify(data.users)}</div>

  )
}
