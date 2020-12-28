import SEO from '@/components/SEO';
import { client } from '@/lib/prismic';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import {Title} from '../styles/pages/Home';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import {Document} from 'prismic-javascript/types/documents'

interface IHomeProps {
  recommendedProducts: Document[];
}

export default function Home({recommendedProducts}: IHomeProps) {
  // client side fetching
  // const [recommendedProducts, setRecommendedProducts] =useState<IProduct[]>([]);

  // useEffect(()=> {
  //    fetch('http://localhost:3333/recommended').then(response => {
  //      response.json().then(data => {
  //        setRecommendedProducts(data)
  //      })
  //    })
  // },[]) // pode usar swr
  // async function handleSum() {
  //   const {sum} = await (await import('../lib/math')).default;
  //   alert(sum(3,5));
  //   console.log(process.env.NEXT_PUBLIC_API_URL);
  // }
  return (
    <div>
      <SEO title='Home' shouldExcludeTitleSuffix image="logo.png" />
      <section>
        <Title>Products</Title>
        <ul>
          {recommendedProducts.map((recommendedProduct: Document)=> {
            return(
              <li key={recommendedProduct.id}>
                <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async() => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ]);
  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    }
  }
}