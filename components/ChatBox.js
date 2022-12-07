import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "../context";
import { useRouter } from "next/router";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../config/firebase";

const msgs = [
  {
    text: "This is demo example text",
    author: "wetihweith",
  },
  {
    text: "This is demo example text",
    author: "wetihweith",
  },
  {
    text: "This is demo example text Lots more demo text so I can test how Long text would appear more more test text I want a very long paragraph",
    author: "wetihweith",
  },
  {
    text: "This is demo example text",
    author: "0x1f50dE40B826d5A25eeE9fA94fde764Be2b9EFFb",
  },
  {
    text: "This is demo example text",
    author: "wetihweith",
  },
  {
    text: "This is demo example text Lots more demo text so I can test how Long text would appear more more test text I want a very long paragraph",
    author: "0x1f50dE40B826d5A25eeE9fA94fde764Be2b9EFFb",
  },
  {
    text: "This is demo example text",
    author: "wetihweith",
  },
  {
    text: "This is demo example text",
    author: "wetihweith",
  },
  {
    text: "This is demo example text Lots more demo text so I can test how Long text would appear more more test text I want a very long paragraph",
    author: "wetihweith",
  },
  {
    text: "This is demo example text",
    author: "wetihweith",
  },
  {
    text: "This is demo example text",
    author: "0x1f50dE40B826d5A25eeE9fA94fde764Be2b9EFFb",
  },
  {
    text: "This is demo example text Lots more demo text so I can test how Long text would appear more more test text I want a very long paragraph",
    author: "0x1f50dE40B826d5A25eeE9fA94fde764Be2b9EFFb",
  },
];

const ChatBox = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState([]);
  const { currentUser } = useAuth();
  const router = useRouter();
  const { chatId, channelId } = router.query;
  const sendMessage = async (text) => {
    const doc = await addDoc(
      collection(db, `collections/${chatId}/${channelId}`),
      {
        author: currentUser.uid,
        text,
        createdAt: Date.now(),
      }
    );
    setInput("");
  };

  const fetchMessages = async () => {
    const q = query(
      collection(db, `collections/${chatId}/${channelId}`),
      orderBy("createdAt"),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push(doc.data());
      });
      setMessages(temp);
    });
  };

  useEffect(() => {
    fetchMessages();
  }, [chatId, channelId]);

  return (
    <div className="bg-slate-200 flex flex-col min-h-full flex-grow-2 rounded-lg py-1 px-3 max-w-2xl self-center lg:self-auto">
      <div className="flex py-3 px-1">
        <h3 className="font-bold text-xl text-slate-600 capitalize">
          {channelId}
        </h3>
      </div>
      <div className="flex flex-col overflow-y-scroll grow bg-white rounded-lg mx-1 px-4 space-y-3 max-h-[600px] py-6">
        {messages?.map(({ text, author }, index) => {
          return (
            <div
              key={index}
              className={`flex items-center ${
                author == currentUser.uid && "flex-row-reverse"
              }`}
            >
              <div className="">
                <div className="rounded-full overflow-hidden h-[50px] w-[50px] cursor-pointer">
                  <Image
                    src="/assets/images/doodles.jpg"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
              <div className="">
                <div className="bg-slate-200 rounded-lg py-2 px-3 mx-2">
                  <p>{text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex py-3 space-x-4 pr-2">
        <input
          className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-slate-400 ${
            error && "border-red-500"
          }  rounded-full py-3 px-4  leading-tight focus:outline-none focus:bg-white`}
          type="text"
          name="input"
          value={input}
          onChange={(text) => setInput(text.target.value)}
          placeholder="Start typing..."
        />
        <div
          className={`center font-bold cursor-pointer ${
            input ? "text-blue-500" : "text-slate-400"
          }`}
          onClick={() => sendMessage(input)}
        >
          Send
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
