const DynamicProfilePage = ({ params }: any) => {
  const { id } = params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <h1>Profile Page</h1>
      <h2 className="p-3 bg-green-500 rounded text-black">{id}</h2>
    </div>
  );
};

export default DynamicProfilePage;
