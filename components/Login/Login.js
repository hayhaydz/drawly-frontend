import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Flex, Heading, IconButton, Input, useToast } from '@chakra-ui/react';
import { RiArrowRightLine } from 'react-icons/ri';
import { useMainContext } from '../../context/MainContext';
import { useUsersContext } from '../../context/UsersContext';
import { useSocketContext } from '../../context/SocketContext';

const Login = () => {
    const socket = useSocketContext();
    const { name, setName, room, setRoom } = useMainContext();
    const { setUsers } = useUsersContext();
    const toast = useToast();
    const router = useRouter();

    useEffect(() => {
        socket.on('users', users => {
            setUsers(users);
        })
    });

    const handleSubmit = () => {
        socket.emit('login', { name, room }, error => {
            if(error) {
                console.log(error);
                return toast({
                    position: "top",
                    title: "Error",
                    description: error,
                    status: "error",
                    duration: 5000,
                    isClosable: true
                });
            }
            router.push('/chat');
            return toast({
                position: "top",
                title: "Hey there",
                description: `Welcome to ${room}`,
                status: "success",
                duration: 5000,
                isClosable: true
            })
        })
    }

    return (
        <Flex className="login" flexDirection='column' mb='8'>
            <Heading as="h1" size="4x1" textAlign='center' mb='8' fontWeight='600'>Drawly.io</Heading>
            <Flex className="form" gap='1rem' flexDirection={{ base: 'column', md: 'row' }}>
                <Input variants='filled' mr={{ base: "0", md: "4" }} mb={{ base: "4", md: "0" }} type="text" placeholder="User name" value={name} onChange={e => setName(e.target.value)} />
                <Input variants='filled' mr={{ base: "0", md: "4" }} mb={{ base: "4", md: "0" }} type="text" placeholder="Room name" value={room} onChange={e => setRoom(e.target.value)} />
                <IconButton colorScheme='blue' isRound='true' icon={<RiArrowRightLine/>} onClick={handleSubmit}></IconButton>
            </Flex>
        </Flex>
    )
}
export default Login;