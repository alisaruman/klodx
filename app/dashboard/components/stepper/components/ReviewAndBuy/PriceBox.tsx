import { Flex, Box, Text } from "@chakra-ui/react";

interface PriceBoxProps {
  priceType: number;
  price: string;
}

const PriceBox: React.FC<PriceBoxProps> = ({ priceType, price }) => {
  const getPriceLabel = (priceType: number): string => {
    switch (priceType) {
      case 1:
        return "ساعتی";
      case 2:
        return "ماهیانه";
      case 3:
        return "سه‌ماهه";
      case 4:
        return "شش‌ماهه";
      case 5:
        return "سالانه";
      default:
        return "نامشخص";
    }
  };

  return (
    <Box flex={1} flexDirection="column" justifyContent="center" alignItems="center" border="1px solid" borderColor="gray.200" minHeight="86px" p={4}>
      <Flex direction="row" justifyContent="space-between">
        <Text>{getPriceLabel(priceType)}:</Text>
        <Text>{price} ریال</Text>
      </Flex>
    </Box>
  );
};

export default PriceBox;
