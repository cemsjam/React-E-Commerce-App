import HeroSlider from "@/components/HeroSlider";
import HomeSectionHeader from "@/components/HomeSectionHeader";
import ProductSlider from "@/components/ProductSlider";

function Home() {
	// return <ProductListing />;
	return (
		<div className="flex flex-col gap-8">
			<HeroSlider />
			<HomeSectionHeader title="Popular Laptops" href="/laptops" linkLabel="All Laptops" />
			<ProductSlider categoryName="laptops" />
			<HomeSectionHeader
				title="Popular Smartphones"
				href="/smartphones"
				linkLabel="All Smartphones"
				reversed
			/>
			<ProductSlider categoryName="smartphones" />
		</div>
	);
}

export default Home;
