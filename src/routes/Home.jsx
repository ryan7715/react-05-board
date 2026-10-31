
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router";

function Home() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then(json => {
                setList(json);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    if (loading) {
        return <div className={styles.loading}>데이터를 로드 중입니다...</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>커뮤니티 게시판</h1>
            <table className={styles.boardTable}>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자 ID</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={index} className={styles.tableRow}>
                            <td className={styles.idCell}>{item.id}</td>
                            <td className={styles.titleCell}>
                                <Link to={`/${item.id}`} className={styles.link}>{item.title}</Link>
                            </td>
                            <td className={styles.userIdCell}>{item.userId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;