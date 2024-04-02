"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  ButtonGroup,
  Divider,
  Heading,
  Stack,
  Text,
  Image,
  Tag,
  HStack,
  SimpleGrid,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Progress,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { Ability, PokemonData, Type, Move, Stat } from "@/types/types";
interface PokemonCardProps {
  pokemon: PokemonData;
}
const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { types, abilities, moves, stats } = pokemon;

  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Heading>

          <SimpleGrid columns={2}>
            <Text as="b">Height : {pokemon.height * 10} cm</Text>
            <Text as="b">Weight : {pokemon.weight / 10} kg</Text>
          </SimpleGrid>

          <HStack>
            {types.map((type: Type) => (
              <Tag key={type.slot}>{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</Tag>
            ))}
          </HStack>
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={2}
            align="stretch"
          >
            {stats.map((stat: Stat, index: number) => (
              <Box h="40px" key={index}>
                {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1) }
                <Progress
                  value={stat.base_stat}
                  size="sm"
                  colorScheme={
                    stat.stat.name === "hp"
                      ? "red"
                      : stat.stat.name === "attack"
                      ? "blue"
                      : stat.stat.name === "special-attack"
                      ? "facebook"
                      : stat.stat.name === "defense"
                      ? "green"
                      : stat.stat.name === "special-defense"
                      ? "whatsapp"
                      : "cyan"
                  }
                />
              </Box>
            ))}
          </VStack>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Play audio
          </Button>

          <Popover>
            <PopoverTrigger>
              <Button colorScheme="purple">Abilities</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>List of abilities</PopoverHeader>
              <PopoverBody>
                <UnorderedList>
                  {abilities.map((ability: Ability) => (
                    <ListItem key={ability.slot}>
                      {ability.ability.name}
                    </ListItem>
                  ))}
                </UnorderedList>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Button onClick={onOpen}>Moves</Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>List of Moves</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <OrderedList spacing={3}>
                  {moves.map((move: Move, index: number) => (
                    <ListItem key={index}>{move.move.name}</ListItem>
                  ))}
                </OrderedList>
              </ModalBody>
            </ModalContent>
          </Modal>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default PokemonCard;
