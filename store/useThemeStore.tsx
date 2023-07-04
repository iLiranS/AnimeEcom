import { create } from "zustand";

let lastStoredTheme: 'light' | 'dark' = 'dark';
if (typeof window !== 'undefined') {
    lastStoredTheme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
    if (lastStoredTheme === 'dark') document.documentElement.classList.add('dark');
  }
  interface themeModel{
    theme:'dark' | 'light',
    modal:boolean,
    toggleTheme : ()=>void
    setModal:(val:boolean)=>void
}


const useThemeStore = create<themeModel>((set)=>({
    theme: lastStoredTheme,
    modal:false,
    toggleTheme: ()=> set((state)=>{
        const newTheme = state.theme ==='light' ? 'dark' : 'light'
        localStorage.setItem('theme',newTheme);
        newTheme === 'dark' ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
        return{
            theme:newTheme
        }
    }),
    setModal:(val)=> set({modal:val})
}))

export default useThemeStore;