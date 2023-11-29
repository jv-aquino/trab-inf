"use client"

import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Copy, Server } from 'lucide-react'

import { toast } from 'react-hot-toast'

export default function ApiAlert({ title, description, variant = "public" }) {
  const onCopy = () => {
    navigator.clipboard.writeText(description)
    toast.success("API copiada")
  }
  return (
    <Alert className='pt-2.5 pb-3'>
      <AlertTitle className='flex items-center'>
        <Server className='h-[24px] w-[24px] pr-2'/>
        {title}
        <Badge className='ml-2' variant={(variant == 'public') ? 'secondary' : 'destructive'}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Badge>
      </AlertTitle> 
      <AlertDescription className="mt-3 flex items-center justify-between">
        <code className='relative rounded px-1.5 py-1 bg-slate-200 text-md font-semibold'>
          {description}
        </code>
        <button className='h-fit w-fit' onClick={() => onCopy()}>
          <span className='symbol pr-4 text-[17px]'>content_copy</span>
        </button>
      </AlertDescription>
    </Alert>
  )
}