"use client";

import { Box, Card, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillBug } from "react-icons/ai";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getIssue();
  }, []);

  const getIssue = async () => {
    try {
      const { data: response } = await axios.get("/api/issues");
      setData(response);
      console.log(response);
    } catch (error) {
      console.error("Can not get data", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map(({ id, title, description, createdAt, status }) => (
        <Card key={id} className="">
          <Box>
            <div className="flex items-center text-red-400">
              <AiFillBug />
              <Text as="div" size="2" weight="bold">
                {title}
              </Text>
            </div>
            <Text as="div" size="2">
              {description}
            </Text>
            <Text as="div" size="1">
              {createdAt}
            </Text>
            <Text as="div" size="1">
              {status}
            </Text>
          </Box>
        </Card>
      ))}
    </div>
  );
}
