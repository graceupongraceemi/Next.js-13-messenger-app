'use client';

import { FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Message } from '../typings';

function ChatInput() {
  const [input, setInput] = useState('');

  const addMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input) return;

    const messageToSend = input;

    setInput('');

    const id = uuid(); // To generate uuid, created an object to push up to Redis

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: 'Emi Esther',
      profilePic:
        'https://images.unsplash.com/photo-1509909756405-be0199881695?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aGFwcHklMjBmYWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
      email: 'emi@gmail.com'
    };

    const uploadMessageToUpstash = async () => {
      const res = await fetch('/api/addMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message
        })
      });

      const data = await res.json();
      console.log('MESSAGE ADDED >>>', data);
    };

    uploadMessageToUpstash();
  };

  return (
    <form
      onSubmit={addMessage}
      className='fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-100'
    >
      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter message here...'
        className='flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed'
      />
      <button
        type='submit'
        disabled={!input}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
