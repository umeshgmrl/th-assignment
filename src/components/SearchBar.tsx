import { InputGroup, Input, Spinner } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { ChangeEvent } from "react";

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
};

export default function SearchBar({ onChange, loading }: Props) {
  return (
    <InputGroup
      display="flex"
      marginTop="30px"
      marginBottom="30px"
      backgroundColor={"grey.700"}
      justifyContent="space-between"
      alignItems="center"
      maxWidth="500px"
      mb="40px"
    >
      <Search2Icon zIndex="1" marginLeft="15px" />
      <Input
        border="1px solid #797670"
        position="absolute"
        height="40px"
        width="full"
        borderRadius={8}
        type="text"
        size="lg"
        fontSize={16}
        padding={5}
        paddingLeft="45px"
        onChange={onChange}
        backgroundColor={"grey.900"}
      />
      {loading && (
        <Spinner
          className="input-spinner"
          width={25}
          height={25}
          marginRight="15px"
          position="absolute"
          right="0"
        />
      )}
    </InputGroup>
  );
}
