export default  async function Page (props: any) {
  const data = await fetch('https://random-data-api.com/api/v2/banks').then((data) => data.json())
  
  return (
    <div className="test-page">
      <h1>Page detail id {props?.params?.id}</h1>
      <p className="text-green-500">{JSON.stringify(data)}</p>
    </div>
  )
}