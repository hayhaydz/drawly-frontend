import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
    Box, 
    Flex, 
    Heading, 
    IconButton,
    Text,
    Menu,
    Button,
    MenuButton,
    MenuList,
    MenuItem,
    useToast
} from '@chakra-ui/react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { FiList } from 'react-icons/fi';
import { BiMessageDetail } from 'react-icons/bi';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useMainContext } from '../../context/MainContext';
import { useUsersContext } from '../../context/UsersContext';
import { useSocketContext } from '../../context/SocketContext';
import './Chat.module.scss';

const Chat = () => {
    const { name, setName, room, setRoom } = useMainContext();
    const { users } = useUsersContext();
    const socket = useSocketContext();
    const toast = useToast();
    const router = useRouter();

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        window.onpopstate = e => logout();
    }, []);
    useEffect(() => { if(!name) return router.push('/') }, [router, name]);

    useEffect(() => {
        socket.on('message', msg => {
            setMessages(messages => [...messages, msg]);
        });

        socket.on('notification', notif => {
            toast({
                position: "top",
                title: notif?.title,
                description: notif?.description,
                status: "success",
                duration: 5000,
                isClosable: true,
            })
        })
    }, [socket, toast]);

    const handleSendMessage = () => {
        socket.emit('sendMessage', message, () => setMessage(''));
        setMessage('');
    }

    const logout = () => {
        setName('');
        setRoom('');
        router.push('/');
    }

    return (
        <Flex className="room" flexDirection='column' width={{ base: "100%", sm: '575px' }} height={{ base: "100%", sm: "auto" }}>
            <Heading className="heading" as='h4' bg='white' p='1rem 1.5rem' borderRadius='10px 10px 0 0'>
                <Flex alignItems='center' justifyContent='space-between'>
                    <Menu>
                        <MenuButton as={IconButton} icon={<FiList />} isRound='true' bg='blue.300' color='white'/>
                        <MenuList>
                            {
                                users && users.map(user => {
                                    return (
                                        <MenuItem minH='40px' key={user.id}>
                                            <Text fontSize='sm'>{user.name}</Text>
                                        </MenuItem>
                                    )
                                })
                            }
                        </MenuList>
                    </Menu>
                    <Flex alignItems='center' flexDirection='column' flex={{ base: '1', sm: 'auto' }}>
                        <Heading fontSize='lg'>{room.slice(0, 1).toUpperCase() + room.slice(1)}</Heading>
                        <Flex alignItems='center'>
                            <Text mr='1' fontWeight='400' fontSize='md' opacity='0.7' letterSpacing='0'>{name}</Text>
                            <Box h={2} w={2} borderRadius='100px' bg='green.300'></Box>
                        </Flex>
                    </Flex>
                    <Button color='gray.500' fontSize='sm' onClick={logout}>Logout</Button>
                </Flex>
            </Heading>

            <ScrollToBottom className="messages" debug={false}>
                {messages.length > 0 ?
                    messages.map((msg, i) => {
                        <Box key={i} className={`message ${msg.user === name ? "my-message" : ""}`} m='0.2rem 0'>
                            <Text className="user" fontSize='xs' opacity='0.7' ml='5px'>{msg.user}</Text>
                            <Text className="msg" fontSize='sm' p='0.4rem 0.8rem' bg='white' borderRadius='15px' color='white'>{msg.text}</Text>
                        </Box>
                    })
                    :
                    <Flex alignItems='center' justifyContent='center' mt='0.5rem' bg='#EAEAEA' opacity='0.2' w='100%'>
                        <Box mr='2'>-----</Box>
                        <BiMessageDetail fontSize='1rem' />
                        <Text ml='1' fontWeight='400'>No messages</Text>
                        <Box ml='2'>-----</Box>
                    </Flex>
                }
            </ScrollToBottom>
            <div className="form">
                <input type="text" className="input" placeholder="Enter message" value={message} onChange={e => setMessage(e.target.value)} />
                <IconButton colorScheme='green' isRound='true' icon={<RiSendPlaneFill />} onClick={handleSendMessage} disabled={message === '' ? true : false}>Send</IconButton>
            </div>
        </Flex>
    )
}
export default Chat;