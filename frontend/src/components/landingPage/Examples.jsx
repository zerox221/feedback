import React from 'react'
import { LockKeyhole } from 'lucide-react'
const feedbacks = [
  {
    author: 'Anonymous',
    time: '2 hours ago',
    text: "You're really good at explaining difficult concepts...",
  },
  {
    author: 'Anonymous',
    time: 'Yesterday',
    text: 'Group projects go smoother when you\'re in them. Thank you.',
  },
  {
    author: 'Anonymous',
    time: 'Mon',
    text: 'Sometimes you reply a little late, but the replies are always thoughtful.',
  },
]

const Examples = () => {
  return (
    <div className='flex h-100  w-full justify-center md:h-100 md:w-[40%] md:items-center'>
      <div className='w-full h-fit max-w-160 rounded-[18px] border border-[#d9dde3] bg-[#f5f5f5]/80 shadow-[0_10px_20px_rgba(15,23,42,0.03)] backdrop-blur-sm md:max-w-160'>
        <div className='space-y-0'>
          {feedbacks.map((item, index) => (
            <div
              key={`${item.author}-${item.time}`}
              className={`px-4 py-3 sm:px-5 sm:py-4 ${
                index < feedbacks.length - 1 ? 'border-b border-[#dfe3e8]' : ''
              }`}
            >
              <div className='mb-1 flex items-center gap-2 text-[10px] text-[#93a0b1] sm:text-[11px]'>
                <span className='font-medium text-[#6b7280]'>{item.author}</span>
                <span className='text-[#a3acba]'>•</span>
                <span>{item.time}</span>
              </div>

              <p className='text-[14px] font-normal leading-[1.45] tracking-[-0.02em] text-[#1f2937] sm:text-[16px]'>
                {item.text}
              </p>
            </div>
          ))}

          <div className='flex items-center gap-3 px-4 py-3 text-[11px] text-[#6b7280] sm:px-5 sm:py-4 sm:text-[12px]'>
            <LockKeyhole size={14} className='sm:h-4 sm:w-4' />
            <span>Senders are never identified.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Examples