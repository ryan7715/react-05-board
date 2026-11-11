import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Post } from "../types/Post.ts";
import { StyledContainer, StyledLoading } from "../styles/commonStyles.ts";
import styled from "styled-components";

const Article = styled.article`
    padding-top: 40px;
`;

const BackLink = styled(Link)`
    color: #666;
    font-size: 14px;
    margin-bottom: 32px;
    padding: 8px 12px;
    border-radius: 6px;
    background-color: #f1f3f5;
    border: 1px solid #666;

    &:hover {
        background-color: #e9ecef;
        color: #0077ff;
    }
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 800;
    color: #111;
    margin-bottom: 24px;
`;

const Meta = styled.div`
    color: #888;
    margin-bottom: 40px;
`;

const Body = styled.div`
    font-size: 1.15rem;
    line-height: 1.8;
    white-space: pre-wrap; /* '\\n'이라고 하는 줄바꿈 기호를 줄바꿈 처리로 사용하겠다 */
`;

function Detail() {
    // 경로 상에 존재하는 값을 react-router 가 가지고 있고, 그걸 꺼내오는 함수
    // /3242df2fhb2
    // 이렇게 동적 라우팅에서 꺼내온 값은 무조건 string
    // id값은 무조건 존재하는가?  => useParams 라는 메서드는 실행 되기 전, 설계도 상황으로 생각
    const { id } = useParams(); // id의 타입은 string | undefined

    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            .then((json: Post) => {
                setPost(json);
                setLoading(false);
            })
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log(err);
                }
            });
    }, [id]);

    if (loading) {
        return <StyledLoading>본문을 불러오는 중입니다...</StyledLoading>;
    }

    if (!post) {
        return <StyledLoading>존재하지 않는 게시글입니다.</StyledLoading>;
    }

    return (
        <StyledContainer>
            <BackLink to={"/"}>&larr; 목록으로 돌아가기</BackLink>

            <Article>
                <Title>{post.title}</Title>
                <Meta>
                    <span>게시물 번호 : {post.id}</span>
                    <span style={{ margin: "0 12px" }}>|</span>
                    <span>작성자 : {post.userId}</span>
                </Meta>
                <Body>{post.body}</Body>
            </Article>
        </StyledContainer>
    );
}

export default Detail;
