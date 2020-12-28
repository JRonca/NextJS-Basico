import {useRouter} from 'next/router';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';
import { GetStaticPaths, GetStaticProps } from 'next';
import { client } from '@/lib/prismic';
// import { useState } from 'react';
// import dynamic from 'next/dynamic';
// const AddToCartModal = dynamic(
//     ()=> import('@/components/AddToCartModal'),
//     { loading: () => <p>Loading...</p>, ssr: false }
// ) // lazy load
// // ssr: false força a renderizar o componente dentro do browser

interface ProductProps {
    product: Document;
}

export default function Product({product}: ProductProps) {
    const route = useRouter();

    if(route.isFallback){
        return <p>Carregando ...</p>
    }

    // const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

    // function handleAddToCart() {
    //     setIsAddToCartModalVisible(!isAddToCartModalVisible);
    // }
    return(
        <div>
            <h1>
                {PrismicDOM.RichText.asText(product.data.title)}
            </h1>

            <img src={product.data.thumbnail.url} width="300" alt={PrismicDOM.RichText.asText(product.data.title)}/>

            <div dangerouslySetInnerHTML={{
                __html: PrismicDOM.RichText.asHtml(product.data.description)
            }}></div>

            <p>Price: ${product.data.price}</p>

            {/*<button onClick={handleAddToCart}>Add to Cart</button>

            { isAddToCartModalVisible && <AddToCartModal />}*/}
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
      paths: [],
      fallback: true,
    }
  }
  
  export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
      const {slug} = context.params;
  
      const product = await client().getByUID('product', String(slug), {});
    
      return {
        props: {
            product,
        },
        revalidate: 60,
      }
    }