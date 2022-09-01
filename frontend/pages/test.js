import axios from 'axios';

/* このページで残りやること
１　承認が必要なお手伝い一覧の表示
２　承認ボタンクリック後、口座間振替のAPIを動作させる　＆　自作APIのcheckをfalseからtrueに変更
*/

export async function getServerSideProps(context) {

  // 自作API
  let noCheck = {};
  await axios
  .get('http://express:3000/helped/false')
  .then(function (response) {
    if(response.data) {
      noCheck = response.data
        console.log(JSON.stringify(response.data));
    }
  })
  .catch(function (error) {
    console.log(error);
  });
  
  return {
    props: {
      noCheck,
    }
  }
}

export default function New(noCheck) {
//   console.log(noCheck)
  console.log(noCheck.noCheck[0].id)

  // TODO:承認必要な一覧をmapで全部表示させる
  return (
    <>
      <p>口座残高</p>
    </>
  )
}