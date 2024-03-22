import useCategory from "../../../../../../../../../api/hooks/category/useCategory";

const Category = ({ categoryID }: { categoryID: number }) => {
  const { data, loading, error } = useCategory({ categoryID: categoryID });

  return (
    <div className="category-info">
      {loading && <span>Loading...</span>}
      {error && <span>Błąd...</span>}
      {data?.category && (
        <>
          <span>Kategoria</span>
          <span>{data.category.name}</span>
        </>
      )}
    </div>
  );
};

export default Category;
