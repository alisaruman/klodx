import { Flex, Box, Text } from "@chakra-ui/react";

interface OsImageBoxProps {
  osFlavor: string;
  osVersion: string;
}

const OsImageBox: React.FC<OsImageBoxProps> = ({ osFlavor, osVersion }) => {
  const getOsImageSrc = (os_flavor: string): string => {
    switch (os_flavor) {
      case "ubuntu":
        return "/images/dashboard/os/ubuntu.png";
      case "debian":
        return "/images/dashboard/os/debian.png";
      case "rocky":
        return "/images/dashboard/os/rockylinux.png";
      case "centos":
        return "/images/dashboard/os/centos.png";
      case "alma":
        return "/images/dashboard/os/almalinux.png";
      default:
        return "https://cdn.britannica.com/22/1722-004-EAD033D8/Flag-Iran.jpg";
    }
  };

  return (
    <Box flex={1} border="1px solid" borderColor="gray.200" p={4}>
      <Flex direction="row" alignItems="center">
        <Box
          as="img"
          src={getOsImageSrc(osFlavor)}
          alt={`${osFlavor} image`}
          width="56px"
          height="35px"
          ml={3}
        />
        <Box>
          <Text fontSize="14px">{osFlavor}</Text>
          <Text fontSize="12px">نسخه: {osVersion}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default OsImageBox;
