
import Head from 'next/head'



function Category({category}: any) {
	return (
		<div>
			<Head>
				<title>{category.title}</title>
			</Head>
			<h1>{category.title}</h1>
		</div>
		)
}







export async function getStaticPaths() {
	const res = await fetch('https://vef2-2022-h1-synilausn.herokuapp.com/categories')
	const categories = await res.json()
	//console.log(categories)
	const paths = categories.items.map((category: any) => ({
    	params: { id: category.id.toString() },
  	}))

	return { paths, fallback: false}
}

export async function getStaticProps({ params }: any) {
	const res = await fetch(`https://vef2-2022-h1-synilausn.herokuapp.com/categories/${params.id}`)
	const category = await res.json()
	return { props: { category } }
}

export default Category