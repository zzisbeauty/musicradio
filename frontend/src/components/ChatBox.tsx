import { useState } from 'react'
import { sendChat } from '../api/chat'

type Message = { role: 'user' | 'claudio'; text: string }

export default function ChatBox() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { role: 'claudio', text: '晚上好，我是 Claudio。你可以点歌，也可以把今天的心情交给我。' }
  ])

  async function submit() {
    const text = input.trim()
    if (!text) return
    setInput('')
    setMessages((value) => [...value, { role: 'user', text }])
    const data = await sendChat(text)
    setMessages((value) => [...value, { role: 'claudio', text: data.reply }])
  }

  return (
    <aside className="mx-auto mt-8 max-w-4xl px-6 pb-8">
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
        <div className="mb-4 max-h-56 space-y-3 overflow-y-auto pr-1">
          {messages.map((message, index) => (
            <div key={index} className={message.role === 'user' ? 'text-right' : 'text-left'}>
              <span className={`inline-block max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-200'}`}>
                {message.text}
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="min-w-0 flex-1 rounded-full border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600"
            value={input}
            placeholder="和 Claudio 说点什么，比如：我今天很累"
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') submit()
            }}
          />
          <button className="rounded-full bg-fuchsia-400 px-5 py-3 text-sm font-medium text-black" onClick={submit}>发送</button>
        </div>
      </div>
    </aside>
  )
}
