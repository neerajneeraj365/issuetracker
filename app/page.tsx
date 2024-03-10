"use client";

import { Box, Card, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillBug } from "react-icons/ai";

export default function Home() {
  const [data, setData] = useState([]);
  console.log("this is the state data", data);

  useEffect(() => {
    getIssue();
  }, [0]);

  const getIssue = async () => {
    try {
      const response = await axios.get("/api/issues");
      const serverData = response.data;
      setData(serverData);
    } catch (error) {
      console.error("Can not get data", error);
    }
  };
  return (
    <div className="grid grid-rows-1 md:grid-rows-2 grid-flow-row md:grid-flow-col gap-4">
      {data.map((i) => (
        <Card style={{ maxWidth: 300 }} key={i.id} size="3" className="m-5">
          <Box className="">
            <AiFillBug />
            <Text as="p" size="2" weight="bold" color="red">
              {i.title}
            </Text>
            <Text as="p" size="2" color="red">
              {i.description}
            </Text>
            <Text as="p" size="2" color="red">
              {i.status}
            </Text>
            <Text as="p" size="2" color="red">
              {i.createdAt}
            </Text>
          </Box>
        </Card>
      ))}
    </div>
  );
}
