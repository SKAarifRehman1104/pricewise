"use client"
import { scrapeAndStoreProduct } from "@/lib/actions";
import Link from "next/link";
import { FormEvent,useState } from "react"
import { useRouter } from 'next/router'; 
const isValidAmazonProductURL = (url: string) =>{
  try{
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if(hostname.includes('amazon.com') || 
    hostname.includes('amazon.') || 
    hostname.endsWith('amazon')
    ){
      return true;
    }
  } catch(error){
    return false;
  }
  return false;
}

const ProductCard = ({product} : Props) => {
  return (
    <Link href={`/products/${product._id}`} className="product-card">
    </Link>
  )
}


const Searchbar = () => {
  // const router = useRouter();
  const [searchPrompt, setSearchPrompt] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit =async(event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    const isValidLink = isValidAmazonProductURL(searchPrompt);
    console.log("hello")

    if(!isValidLink) return alert('Please provide a valid Amazon link')

    try {
      setIsLoading(true);

      //Scrape the product page
      const product = await scrapeAndStoreProduct(searchPrompt);
      console.log(product);

      // router.push(`/products/${product._id}`);
    } catch (error) {
      console.error();
    }finally{
      setIsLoading(false);
    }
  }
  return (
    <form
      className='flex flex-wrap gap-4 mt-12'
      onSubmit={handleSubmit}  
    >
    <input
      type="text"
      value={searchPrompt}
      onChange={(e) => setSearchPrompt(e.target.value)}
      placeholder="Enter product link"
      className="searchbar-input"
    />
    <button 
      type="submit"
      className="searchbar-btn"
      disabled={searchPrompt === ''}

      
    >

      {isLoading ? 'Searching...' : 'Search'}
    </button>
    </form>
  )
}

export default Searchbar
