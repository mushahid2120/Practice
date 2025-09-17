

export default function InputField({name}) {
  return (
    <div>
      <label htmlFor="userName" className="relative">
      <span className="font-semibold text-[12px] absolute white -top-[14px] left-4 bg-white">{name}</span>
      <input type="text"  name="userName" id="userName"  className="border-[#5A5959] border-solid border-[1.5px] outline-none rounded-[4px] h-[30px] w-full px-2 text-sm"
            
      />
      </label>
    </div>
  );
}
