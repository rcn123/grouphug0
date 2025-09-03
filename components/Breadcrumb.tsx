'use client';   

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import { Fragment } from 'react';

type BreacrumbProps = 
{
  customLabel? : Record<string,string>;
}
