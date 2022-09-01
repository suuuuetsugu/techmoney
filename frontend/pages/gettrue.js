export default function TrueList(props) {
  return <>{console.log(props)}</>;
}

export async function getServerSideProps() {
  const res = await axios.get("http://express:3000/helps/true");
  const posts = await res.data;
  return {
    props: {
      posts,
    },
  };
}
