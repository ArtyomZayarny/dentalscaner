import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Card() {
  return (
    <div className="flex gap-4">
      <Image
        className="flex w-full max-w-[131px]"
        src={'/clinic-preview.png'}
        alt="clinic-pick"
        width={131}
        height={133}
      />

      <div className="flex flex-col items-start gap-4 w-full">
        <div className="flex flex-col text-base gap-3 w-full">
          <h4>Dash Dental Clinic</h4>
          <p>June 15 2025</p>
          <div className="flex justify-between">
            <p>
              <span className="font-bold">Procedure:</span> Routine Dental Check
            </p>
            <span className="font-bold">10:00 AM</span>
          </div>
        </div>
        <Button className="px-4 py-2 bg-[#1648CE] bordered-md text-white font-semibold text-base hover:bg-[#1648CE]/70">
          <Link href="/detatails-page">View Details</Link>
        </Button>
      </div>
    </div>
  );
}

export default Card;
