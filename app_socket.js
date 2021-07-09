exports = module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log(`Connection : SocketId = ${socket.id}`);

        let userName = '';

        socket.on('subscribe', (data) => {
            console.log('subscribe trigged');
            const room_data = JSON.parse(data);
            userName = room_data.userName;
            const roomName = room_data.roomName;

            socket.join(`${roomName}`);
            console.log(`UserName : ${userName} joined Room Name : ${roomName}`);

            io.to(`${roomName}`).emit('newUserTochatRoom', userName);
        });

        socket.on('unsubscribe', (data) => {
            console.log('unsubscribe trigged');
            const room_data = JSON.parse(data);
            const userName = room_data.userName;
            const roomName = room_data.roomName;

            console.log(`Username : ${userName} leaved Room Name : ${roomName}`);
            socket.broadcast.to(`${roomName}`).emit('userLeftChatRoom', userName);
            socket.leave(`${roomName}`);
        });

        socket.on('newMessage', (data) => {
            console.log('new message trigged');

            const messageData = JSON.parse(data);
            const messageContent = messageData.messageContent;
            const roomName = messageData.roomName;

            console.log(`[Room Number ${roomName}] ${userName} : ${messageContent}`);

            const chatData = {
                userName: userName,
                messageContent: messageContent,
                roomName: roomName
            }
            socket.broadcast.to(`${roomName}`).emit('updateChat', JSON.stringify(chatData));
        });

        socket.on('disconnect', () => {
            console.log('discoonected')
        });
    });
}
