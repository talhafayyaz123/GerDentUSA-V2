import Category from "./Category";

const CategoryList = ( props : any ) => {

    return (
        <>
            <section className="featured-categories py-28">
                <div className="featured-category-wrapper width">
                    <h2 className="text-3xl font-bold text-center">{props.title}</h2>
                    <div className="featured-category-imgs-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 w-full">
                        {props.Categories.map((category : any) => (
                            <Category key={category.id} category={category} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
};

export default CategoryList;
