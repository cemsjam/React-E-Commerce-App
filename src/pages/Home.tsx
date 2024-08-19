import HeroSlider from "@/components/HeroSlider";
import HomeSectionHeader from "@/components/HomeSectionHeader";
import ProductSlider from "@/components/ProductSlider";

function Home() {
	// return <ProductListing />;
	return (
		<div className="container p-4">
			<div className="flex flex-col gap-8">
				<HeroSlider />
				<HomeSectionHeader title="Popular Laptops" href="/category/laptops" linkLabel="All Laptops" />
				<ProductSlider categoryName="laptops" />
				<HomeSectionHeader
					title="Popular Smartphones"
					href="/category/smartphones"
					linkLabel="All Smartphones"
					reversed
				/>
				<ProductSlider categoryName="smartphones" />
			</div>
		</div>
	);
}

export default Home;
