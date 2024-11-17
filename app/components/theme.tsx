import Image from 'next/image';
import { cn } from '../utils'

// props for the theme component 

interface ThemeProps {
  src: string; // Icon source
  text: string; // Label for the theme
  isChosen: boolean; // If the theme is currently selected
  changeTheme: () => void; // Function to update the theme
}

const Theme: React.FC<ThemeProps> = ({ src, text, isChosen, changeTheme }) => {
  return (
    <div className={cn("w-full h-full px-[16px] py-[6px] cursor-pointer flex justify-between items-center rounded-full", isChosen ? 'shadow-[0px_5px_10px_0px_rgba(0,0,0,0.1)]' : '')} onClick={changeTheme}>
      {text == 'Light' && <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.49999 12.1667C10.0773 12.1667 12.1667 10.0774 12.1667 7.50008C12.1667 4.92275 10.0773 2.83341 7.49999 2.83341C4.92266 2.83341 2.83332 4.92275 2.83332 7.50008C2.83332 10.0774 4.92266 12.1667 7.49999 12.1667Z" fill={isChosen ? "#111827" : "#A0AEC0"} />
        <path d="M7.49999 14.8067C7.13332 14.8067 6.83332 14.5334 6.83332 14.1667V14.1134C6.83332 13.7467 7.13332 13.4467 7.49999 13.4467C7.86666 13.4467 8.16666 13.7467 8.16666 14.1134C8.16666 14.4801 7.86666 14.8067 7.49999 14.8067ZM12.26 12.9267C12.0867 12.9267 11.92 12.8601 11.7867 12.7334L11.7 12.6467C11.44 12.3867 11.44 11.9667 11.7 11.7067C11.96 11.4467 12.38 11.4467 12.64 11.7067L12.7267 11.7934C12.9867 12.0534 12.9867 12.4734 12.7267 12.7334C12.6 12.8601 12.4333 12.9267 12.26 12.9267ZM2.73999 12.9267C2.56666 12.9267 2.39999 12.8601 2.26666 12.7334C2.00666 12.4734 2.00666 12.0534 2.26666 11.7934L2.35332 11.7067C2.61332 11.4467 3.03332 11.4467 3.29332 11.7067C3.55332 11.9667 3.55332 12.3867 3.29332 12.6467L3.20666 12.7334C3.07999 12.8601 2.90666 12.9267 2.73999 12.9267ZM14.1667 8.16675H14.1133C13.7467 8.16675 13.4467 7.86675 13.4467 7.50008C13.4467 7.13341 13.7467 6.83342 14.1133 6.83342C14.48 6.83342 14.8067 7.13341 14.8067 7.50008C14.8067 7.86675 14.5333 8.16675 14.1667 8.16675ZM0.886656 8.16675H0.833323C0.466657 8.16675 0.166656 7.86675 0.166656 7.50008C0.166656 7.13341 0.466657 6.83342 0.833323 6.83342C1.19999 6.83342 1.52666 7.13341 1.52666 7.50008C1.52666 7.86675 1.25332 8.16675 0.886656 8.16675ZM12.1733 3.49341C12 3.49341 11.8333 3.42675 11.7 3.30008C11.44 3.04008 11.44 2.62008 11.7 2.36008L11.7867 2.27341C12.0467 2.01341 12.4667 2.01341 12.7267 2.27341C12.9867 2.53341 12.9867 2.95341 12.7267 3.21341L12.64 3.30008C12.5133 3.42675 12.3467 3.49341 12.1733 3.49341ZM2.82666 3.49341C2.65332 3.49341 2.48666 3.42675 2.35332 3.30008L2.26666 3.20675C2.00666 2.94675 2.00666 2.52675 2.26666 2.26675C2.52666 2.00675 2.94666 2.00675 3.20666 2.26675L3.29332 2.35342C3.55332 2.61342 3.55332 3.03341 3.29332 3.29341C3.16666 3.42675 2.99332 3.49341 2.82666 3.49341ZM7.49999 1.52675C7.13332 1.52675 6.83332 1.25341 6.83332 0.886748V0.833415C6.83332 0.466748 7.13332 0.166748 7.49999 0.166748C7.86666 0.166748 8.16666 0.466748 8.16666 0.833415C8.16666 1.20008 7.86666 1.52675 7.49999 1.52675Z" fill={isChosen ? "#111827" : "#A0AEC0"} />
      </svg>}

      {text == 'Dark' && <svg width="25" height="25" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.3533 10.12C13.2467 9.94 12.9467 9.66 12.2 9.79333C11.7867 9.86666 11.3667 9.9 10.9467 9.88C9.39334 9.81333 7.98667 9.1 7.00667 8C6.14 7.03333 5.60667 5.77333 5.6 4.41333C5.6 3.65333 5.74667 2.92 6.04667 2.22666C6.34 1.55333 6.13334 1.2 5.98667 1.05333C5.83334 0.899996 5.47334 0.686663 4.76667 0.979996C2.04 2.12666 0.353337 4.86 0.553337 7.78666C0.753337 10.54 2.68667 12.8933 5.24667 13.78C5.86 13.9933 6.50667 14.12 7.17334 14.1467C7.28 14.1533 7.38667 14.16 7.49334 14.16C9.72667 14.16 11.82 13.1067 13.14 11.3133C13.5867 10.6933 13.4667 10.3 13.3533 10.12Z" fill={isChosen ? "#111827" : "#A0AEC0"} />
      </svg>}



      <div className={cn('font-boldl text-[19px]', text === 'Dark' ? "mr-[3px]" : 'ml-0', isChosen ? 'text-black' : 'text-[#A0AEC0]')}>{text}</div>
    </div>
  )
}

export default Theme;