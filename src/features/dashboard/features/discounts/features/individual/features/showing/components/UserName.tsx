import useAxiosGet from "../../../../../../../../../api/hooks/useAxiosGet";

const UserName = ({ userID }: { userID: number }) => {
  const { data, loading, error } = useAxiosGet({
    url: `/api/users/${userID}/?attribute=username`,
  });
  return (
    <div className="user-info">
      {loading && <span>Loading...</span>}
      {error && <span>Błąd...</span>}
      {data?.singleAttribute && (
        <>
          <span>Nazwa użytkownika</span>
          <span>{data.singleAttribute}</span>
        </>
      )}
    </div>
  );
};

export default UserName;
