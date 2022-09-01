import axios from 'axios';
import Link from 'next/link'
import Router from 'next/router';

/* このページで実装すること

1 現在のお手伝いリストを全件取得（自作APIから取得）
=> 削除、追加、編集ができるようにする（DELETE,PUT,PATCH）
※編集PUTで代用するイメージ？

2 承認ページへの遷移（リンク）

3 ログインページ　もしくは　TOP ページへの遷移（リンク）

*/

// GET：TODO一覧の表示
export async function getServerSideProps(context) {

    // 自作API
    let helpList = {};
    await axios
    .get('http://express:3000/helps')
    .then(function (response) {
      if(response.data) {
        helpList = response.data
          console.log(JSON.stringify(response.data));
      }
    })
    .catch(function (error) {
    console.log(error);
    });

    return {
      props: {
        helpList,
      }
    }
}

export default function Home(helpList) {
    console.log(helpList)

  // リストから削除 idの渡し方考える
  async function deleteTask(id) {
    await fetch(`http://express:3000/helps/${id}`, {
      mode: 'cors',
      method: 'DELETE',
    });
  }

  // リストに追加
  
  // リストを編集

  return (
    <>
      {/* {console.log(helpList)} */}
      {/* <Link href={`/create`} >📝新規作成</Link> */}
      <p>テスト</p>
      <div>
        {helpList.helpList.map((help) => {
          return(
            <>
            <div>
              <p>{help.name}</p>
              <p>{help.money}円</p>
              {/* <Link href={`/${task.id}`}>👀詳細</Link>
              <Link href={`/${task.id}/edit`}>📝編集</Link> */}
              <button onClick={()=> deleteTask(help.id)}>削除</button>
            </div>
            <br/>
            </>
          )
        })
        }
      </div>
    </>

  )
}