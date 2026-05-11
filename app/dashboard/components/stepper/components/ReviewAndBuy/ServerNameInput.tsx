import { Box, Flex, Text, Input } from "@chakra-ui/react";
import { useDispatch } from 'react-redux';
import { setName } from '@/app/redux/slices/createServerSlice';

interface ServerNameInputProps {
  serverName: string;
  iconFilter: string;
}

const ServerNameInput: React.FC<ServerNameInputProps> = ({ serverName, iconFilter }) => {
  const dispatch = useDispatch();

  return (
    <Box mb={8}>
      <Box mt={4}>
        <Input
          placeholder="سرور ۱"
          value={serverName}
          onChange={(e) => dispatch(setName(e.target.value))}
        />
      </Box>
    </Box>
  );
};

export default ServerNameInput;
