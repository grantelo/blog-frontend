import React, { FC } from "react";
import { Divider, Paper, Typography } from "@mui/material";
import AddCommentForm from "../AddCommentForm";

import styles from "./PostComments.module.sass";
import Comment from "../Comment";
import { Box } from "@mui/system";
import { IComment } from "../../models/IComment";
import { bindActionCreators } from "redux";
import * as CommentActionCreators from "../../redux/actions/comment";
import { useDispatch } from "react-redux";
import useTypedSelector from "../../hooks/useTypedSelector";

interface PostComments {
  comments: IComment[];
  postId: number;
}

const PostComments: FC<PostComments> = ({ comments, postId }) => {
  // const [value, setValue] = React.useState<number>(0);
  //
  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //     setValue(newValue);
  // };
  const isLoading = useTypedSelector<boolean>(
    ({ comment }) => comment.isLoading
  );
  const dispatch = useDispatch();
  const {
    requestAddCommentAction,
    requestUpdateCommentAction,
    requestDeleteCommentAction,
  } = bindActionCreators(CommentActionCreators, dispatch);

  const handleAddComment = (text: string) => {
    requestAddCommentAction({ postId, text });
  };

  const handleEditComment = (id: number, text: string) => {
    requestUpdateCommentAction({ id, dto: { text } });
  };

  const handleDeleteComment = (id: number) => {
    requestDeleteCommentAction(id);
  };

  return (
    <>
      <Paper className={styles.paper}>
        <Box className={styles.container}>
          <Typography className={styles.title} variant={"h6"}>
            Количество комментариев: {comments.length}
          </Typography>
          {/*<Tabs*/}
          {/*    value={value}*/}
          {/*    onChange={handleChange}*/}
          {/*>*/}
          {/*    <Tab label="Популярные"/>*/}
          {/*    <Tab label="По порядку"/>*/}
          {/*</Tabs>*/}
          <Divider />
          <AddCommentForm
            onAddComment={handleAddComment}
            isSubmiting={isLoading}
          />
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              authorId={comment.user.id}
              text={comment.text}
              fullName={comment.user.fullName}
              avatar={comment.user.avatar}
              updatedAt={comment.updatedAt}
              handleEdit={handleEditComment}
              handleDelete={handleDeleteComment}
              isLoading={isLoading}
            />
          ))}
        </Box>
      </Paper>
    </>
  );
};

export default PostComments;
