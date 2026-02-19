import Image from 'next/image';


export default async function Home({searchParams}) {
  return (
    <>
    <div className='text-2xl'>This is Home Page...</div> 
    <img src="image1.jpg" alt="image" width="100"/>  
    <Image
      src="/image1.jpg"
      alt="image-next"
      width={200}
      alt="Picture of the author"
    />
    </>
  );
}
