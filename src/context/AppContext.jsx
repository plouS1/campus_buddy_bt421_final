import { useCallback, useState } from 'react';
import { mockStudents, mockPosts, mockConversations } from '../data/mockData';
import { AppContext } from './useApp';

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState(mockPosts);
  const [students] = useState(mockStudents);
  const [conversations, setConversations] = useState(mockConversations);
  const [connections, setConnections] = useState(['s1', 's3', 's4']);
  const [finderIndex, setFinderIndex] = useState(0);

  function login(userData) {
    const user = {
      id: 'me',
      name: userData.name,
      email: userData.email.trim().toLowerCase(),
      major: userData.major,
      year: userData.year,
      interests: userData.interests,
      avatar: userData.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
      avatarColor: '#6366f1',
    };
    setCurrentUser(user);
  }

  function updateProfile(userData) {
    setCurrentUser(prev => ({ ...prev, ...userData }));
  }

  function addPost(postData) {
    const newPost = {
      id: `p${Date.now()}`,
      authorId: 'me',
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorAvatarColor: currentUser.avatarColor,
      interested: 0,
      timestamp: Date.now(),
      ...postData,
    };
    setPosts(prev => [newPost, ...prev]);
  }

  function toggleInterested(postId) {
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, interested: p.userInterested ? p.interested - 1 : p.interested + 1, userInterested: !p.userInterested }
        : p
    ));
  }

  function connectStudent(studentId) {
    setConnections(prev => [...prev, studentId]);
    const student = students.find(s => s.id === studentId);
    if (student && !conversations.find(c => c.participantId === studentId)) {
      setConversations(prev => [{
        id: `c${Date.now()}`,
        participantId: studentId,
        participantName: student.name,
        participantAvatar: student.avatar,
        participantAvatarColor: student.avatarColor,
        lastMessage: 'You connected! Say hi 👋',
        lastTime: 'Just now',
        unread: 0,
        messages: [],
      }, ...prev]);
    }
    advanceFinder();
  }

  function advanceFinder() {
    setFinderIndex(prev => prev + 1);
  }

  function sendMessage(conversationId, text) {
    setConversations(prev => prev.map(c => {
      if (c.id !== conversationId) return c;
      const newMsg = {
        id: `msg${Date.now()}`,
        senderId: 'me',
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      return {
        ...c,
        messages: [...c.messages, newMsg],
        lastMessage: text,
        lastTime: 'Just now',
        unread: 0,
      };
    }));
  }

  const markRead = useCallback((conversationId) => {
    setConversations(prev => prev.map(c =>
      c.id === conversationId ? { ...c, unread: 0 } : c
    ));
  }, []);

  const finderStudents = students.filter(s => !connections.includes(s.id));

  return (
    <AppContext.Provider value={{
      currentUser, login, updateProfile,
      posts, addPost, toggleInterested,
      students, finderStudents, finderIndex, connectStudent, advanceFinder,
      conversations, sendMessage, markRead,
      connections,
    }}>
      {children}
    </AppContext.Provider>
  );
}
