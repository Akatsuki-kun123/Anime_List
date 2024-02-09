import React, { useEffect, useState } from "react";
import moment from "moment";

import { Space, Avatar, Button, Form, Input, List, Image, Modal } from "antd";
import { Comment } from "@ant-design/compatible";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  WeiboOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./DetailContent.css";
import avatar from "./Avatar/147285.png";
import axios from "axios";

const { TextArea } = Input;
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={
      <p style={{ color: "white" }}>
        {comments.length} {comments.length > 1 ? "replies" : "reply"}
      </p>
    }
    itemLayout="horizontal"
    renderItem={(props) => (
      <>
        <Comment
          style={{ backgroundColor: "black" }}
          avatar={<Image src={avatar}></Image>}
          datetime={
            <a style={{ color: "lightblue" }}>
              {moment("2016-11-22").fromNow()}
            </a>
          }
          author={<a style={{ color: "lightblue" }}>{props.author}</a>}
          content={
            <p style={{ color: "white", fontSize: 16 }}>{props.content}</p>
          }
        />
        <a
          style={{
            color: "",
          }}
          onClick={() => handleDelete(props)}
        >
          Delete
        </a>
      </>
    )}
  />
);
const handleDelete = (comment) => {
  axios.post("/api/delComment", { data: comment });
};
const Editor = ({
  onSetUser,
  onComment,
  onSubmit,
  submitting,
  user,
  value,
}) => (
  <>
    <Form.Item>
      <TextArea rows={1} onChange={onSetUser} value={user} placeholder="Name" />
    </Form.Item>
    <Form.Item>
      <TextArea
        rows={4}
        onChange={onComment}
        value={value}
        placeholder="Comment"
      />
    </Form.Item>
    <Form.Item>
      <Button
        className="edit-button"
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="text"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

function DetailContent(props) {
  const [anime, setAnime] = useState(null);
  const [genres, setGenres] = useState(null);
  const [producers, setProducers] = useState(null);

  const [user, setUser] = useState("");
  const [value, setValue] = useState("");
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const [form] = Form.useForm();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (value) => {
    setUsername(value.username);
    setPassword(value.password);
    setIsModalOpen(false);

    if (
      value.username == process.env.REACT_APP_ADMIN &&
      value.password == process.env.REACT_APP_IDENTIFY
    ) {
    }
  };

  const handleSubmit = () => {
    if (!value) return;

    let newComment = {
      author: user,
      content: value,
      key: anime.key,
    };
    setSubmitting(true);

    setTimeout(() => {
      axios.post("/api/addComment", { data: newComment });

      setSubmitting(false);
      setValue("");
      setUser("");
      setComments([...comments, newComment]);
    }, 1000);
  };
  const handleComment = (e) => {
    setValue(e.target.value);
  };
  const handleUser = (e) => {
    setUser(e.target.value);
  };

  function replaceWithBr() {
    return anime.synopsis.replace(/\n/g, "<br />");
  }

  useEffect(() => {
    let data = props.detail[0];
    setAnime(data);
    setComments(data.comments);

    let producer_string = "";
    for (let index in data.producers) {
      if (index == data.producers.length - 1) {
        producer_string = producer_string + data.producers[index].name;
        break;
      }

      producer_string = producer_string + data.producers[index].name + ", ";
    }
    setProducers(producer_string);

    let genre_string = "";
    for (let index in data.genres) {
      if (index == data.genres.length - 1) {
        genre_string = genre_string + data.genres[index].name;
        break;
      }

      genre_string = genre_string + data.genres[index].name + ", ";
    }
    setGenres(genre_string);
  }, []);

  return (
    <div>
      <Modal
        title="Login"
        open={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="username">
            <TextArea rows={1} placeholder="Username" />
          </Form.Item>
          <Form.Item name="password">
            <TextArea rows={2} placeholder="Password" />
          </Form.Item>
        </Form>
      </Modal>

      {anime ? (
        <div>
          <table
            style={{
              marginLeft: "2%",
              marginBottom: 20,

              width: "96%",
              backgroundColor: "#252525",
              borderBottom: "1px solid #8B8B8B",
            }}
          >
            <tr>
              <div
                style={{
                  marginLeft: 20,

                  fontSize: 20,
                  maxWidth: 700,
                  color: "white",
                }}
              >
                {anime.name}
              </div>
            </tr>
          </table>

          <table
            style={{
              width: "96%",
              marginLeft: "2%",
              borderLeft: "1px solid #292929",
              borderRight: "1px solid #292929",
              borderBottom: "1px solid #292929",
            }}
          >
            <tr>
              <td
                valign="top"
                width={300}
                style={{ borderRight: "1px solid #292929" }}
              >
                <div
                  style={{
                    marginLeft: "5%",
                    marginBottom: 20,

                    fontSize: 15,
                    color: "white",
                    textAlign: "center",

                    width: "90%",
                    borderBottom: "1px solid #8B8B8B",
                  }}
                >
                  English Titles: {anime.title}
                </div>

                <div>
                  <div
                    style={{
                      marginBottom: 20,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={anime.image}></img>
                  </div>

                  <div
                    style={{
                      marginLeft: "5%",
                      marginBottom: 20,

                      fontSize: 15,
                      color: "white",
                      textAlign: "center",

                      width: "90%",
                      borderBottom: "1px solid #8B8B8B",
                    }}
                  >
                    Information
                  </div>

                  <div style={{ marginLeft: 20, color: "white" }}>
                    Aired: {anime.aired}
                  </div>

                  <div style={{ marginLeft: 20, color: "white" }}>
                    Episode(s): {anime.episodes}
                  </div>

                  <div style={{ marginLeft: 20, color: "white" }}>
                    Producer: {producers}
                  </div>

                  <div style={{ marginLeft: 20, color: "white" }}>
                    Studio(s): {anime.studio.name}
                  </div>

                  <div style={{ marginLeft: 20, color: "white" }}>
                    Genre(s): {genres}
                  </div>

                  <div
                    style={{
                      marginLeft: "5%",
                      marginTop: 40,
                      marginBottom: 10,

                      fontSize: 15,
                      color: "white",
                      textAlign: "center",

                      width: "90%",
                      borderBottom: "1px solid #8B8B8B",
                    }}
                  >
                    More information
                  </div>
                  <Space style={{ marginBottom: 20 }}>
                    <InstagramOutlined
                      style={{
                        color: "white",
                        fontSize: 40,
                        marginLeft: 20,
                        marginTop: 20,
                      }}
                    />
                    <FacebookOutlined
                      style={{
                        color: "white",
                        fontSize: 40,
                        marginLeft: 20,
                        marginTop: 20,
                      }}
                    />
                    <TwitterOutlined
                      style={{
                        color: "white",
                        fontSize: 40,
                        marginLeft: 20,
                        marginTop: 20,
                      }}
                    />
                    <WeiboOutlined
                      style={{
                        color: "white",
                        fontSize: 40,
                        marginLeft: 20,
                        marginTop: 20,
                      }}
                    />
                  </Space>
                </div>
              </td>

              <td valign="top">
                <div
                  style={{
                    marginLeft: "2%",
                    marginBottom: 15,

                    color: "white",
                    fontWeight: "bold",

                    width: "94%",
                    borderBottom: "1px solid #8B8B8B",
                  }}
                >
                  Synopsis
                </div>

                <p
                  dangerouslySetInnerHTML={{ __html: replaceWithBr() }}
                  style={{
                    color: "white",
                    width: "94%",

                    marginLeft: 30,
                    marginBottom: 30,
                  }}
                />

                <div
                  style={{
                    marginLeft: "2%",
                    marginBottom: 15,

                    color: "white",
                    fontWeight: "bold",

                    width: "94%",
                    borderBottom: "1px solid #8B8B8B",
                  }}
                >
                  Characters
                </div>

                <div style={{ color: "white" }}>
                  {anime.characters.map((elem, index) => {
                    return (
                      <table
                        style={{
                          marginLeft: "2%",
                          width: "46%",
                          display: "inline-block",
                        }}
                      >
                        <td valign="middle" style={{ width: "5%" }}>
                          <img src={elem.image}></img>
                        </td>
                        <td valign="middle">{elem.name}</td>
                        <td>
                          <table align="right">
                            <td valign="middle">{elem.voice_actor.name}</td>
                            <td valign="middle">
                              <img src={elem.voice_actor.image}></img>
                            </td>
                          </table>
                        </td>
                      </table>
                    );
                  })}
                </div>

                <div
                  style={{
                    marginTop: 20,
                    marginLeft: "2%",

                    color: "white",
                    fontWeight: "bold",

                    width: "94%",
                    borderBottom: "1px solid #8B8B8B",
                  }}
                >
                  Comments
                  <a
                    style={{
                      width: 50,
                      float: "right",

                      color: "lightblue",
                      textAlign: "center",
                    }}
                    onClick={showModal}
                  >
                    Edit
                  </a>
                </div>

                <div
                  style={{
                    marginTop: 5,
                    marginLeft: "2%",
                    marginRight: "4%",
                  }}
                >
                  {comments.length > 0 && <CommentList comments={comments} />}
                  <Comment
                    style={{ backgroundColor: "black" }}
                    avatar={<Avatar icon={<UserOutlined />} size={64} />}
                    content={
                      <Editor
                        onSetUser={handleUser}
                        onComment={handleComment}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        user={user}
                        value={value}
                      />
                    }
                  />
                </div>
              </td>
            </tr>
          </table>
        </div>
      ) : (
        <div style={{ backgroundColor: "black", height: 5000 }}></div>
      )}
    </div>
  );
}

export default DetailContent;
