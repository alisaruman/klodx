/* eslint-disable react-hooks/rules-of-hooks */
import {
  Center,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  useColorModeValue,
  useMediaQuery,
  Text,
  Box,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react"
import React from "react"

const NotificationsComponent = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px")
  const lightBg = isMobile === true ? "transparent" : "brandGray.1300"

  const tabStyles = {
    fontSize: 13,
    _selected: {
      borderBottomWidth: 4,
    },
  }

  return (
    <Flex justify="end">
      <Center
        w={10}
        h={10}
        borderRadius="full"
        bg={useColorModeValue(lightBg, "brandDark.1500")}
        cursor="pointer"
      >
        <Menu isLazy closeOnSelect={false}>
          {({ onClose }) => (
            <>
              <MenuButton
                as="i"
                className="icon-notifications"
                style={{
                  width: "24px",
                  height: "24px",
                  filter: useColorModeValue("unset", "brightness(0) invert(1)"),
                }}
              />
              <Portal>
                <MenuList
                  w={500}
                  zIndex={999}
                  p={4}
                  bg={useColorModeValue("brandGray.1800", "brandDark.bg.100")}
                >
                  <HStack justify="space-between" gap={4}>
                    <Text as="span">اعلان‌ها</Text>
                    <Box
                      as="i"
                      className="icon-close"
                      boxSize={10}
                      cursor="pointer"
                      onClick={onClose}
                    ></Box>
                  </HStack>
                  <Tabs>
                    <TabList>
                      <Tab
                        fontSize={13}
                        _selected={{ borderColor: "red", borderBottomWidth: 4 }}
                      >
                        همه
                      </Tab>
                      <Tab style={tabStyles}>مخصوص شما</Tab>
                      <Tab fontSize={13}>اطلاعیه عمومی</Tab>
                    </TabList>
                  </Tabs>
                  <MenuItem>test</MenuItem>
                </MenuList>
              </Portal>
            </>
          )}
        </Menu>
      </Center>
    </Flex>
  )
}

export default NotificationsComponent
