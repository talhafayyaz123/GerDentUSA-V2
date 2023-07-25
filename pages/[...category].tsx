import { GetStaticPaths, NextPage } from "next";
import CategoryPage from "../components/Slugs/IndexPage";
import { API_BASE_URL, SITE_URL } from "../lib/constants";
import { SlugProvider } from "../contexts/SlugContext";

const category: NextPage = ({ slug, slugRecord }: any) => {
  return (
    <SlugProvider>
      {slug != undefined ? (
        <CategoryPage
          url={slug}
          slugRecord={slugRecord}
        />
      ) : (
        ""
      )}
    </SlugProvider>
  );
};

export async function getStaticProps({ params }: any) {
  let slug: any = params.category;
  slug = slug.join("/");
  // const res = await fetch(`${SITE_URL}api/slug`, {
  //     method: "POST",
  //     body: JSON.stringify({url: slug}),
  //     headers : {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //     }
  // }).then(response => response.json())
  // const { category } = context.params
  const res = await fetch(`${API_BASE_URL}${slug}`).then((response) =>
    response.json()
  );
  return {
    props: { slug: params.category, slugRecord: res },
    revalidate: 360,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  let slugs: any = await fetch(`${API_BASE_URL}slugPaths`).then((response) =>
    response.json()
  );
  return {
    paths: slugs.map((slugs: any) => {
      return {
        params: { category: slugs.split("/") },
      };
    }),
    fallback: false,
  };
};

export default category;
