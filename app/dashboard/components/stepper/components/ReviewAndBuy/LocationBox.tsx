import { Flex, Box, Text } from "@chakra-ui/react";

interface LocationBoxProps {
  country: string;
  name: string;
  city: string;
}

const LocationBox: React.FC<LocationBoxProps> = ({ country, name, city }) => {
  const getLocationImageSrc = (country: string): string => {
    switch (country) {
      case "DE":
        return "/images/dashboard/locations/de.png";
      case "FI":
        return "/images/dashboard/locations/fi.png";
      case "US":
        return "/images/dashboard/locations/us.png";
      case "SG":
        return "/images/dashboard/locations/sg.png";
      default:
        return "https://cdn.britannica.com/22/1722-004-EAD033D8/Flag-Iran.jpg";
    }
  };

  return (
    <Box flex={1} border="1px solid" borderColor="gray.200" p={4}>
      <Flex direction="row" alignItems="center">
        <Box
          as="img"
          src={getLocationImageSrc(country)}
          alt={`${name} image`}
          width="56px"
          height="35px"
          ml={3}
        />
        <Box>
          <Text fontSize="14px">{name}</Text>
          <Text fontSize="12px">{city}, {country}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default LocationBox;
