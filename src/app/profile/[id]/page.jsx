
export default function HomePage({params}) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-2xl p-8 space-y-4 text-center">
          <h1 className="text-3xl font-bold">Welcome Back,</h1>
  
          <div className="bg-zinc-800 rounded-xl p-6 space-y-3">
            <div>
              <p className="text-sm text-zinc-400">Profile Name</p>
              <p className="text-xl font-semibold">John Doe</p>
            </div>
  
            <div>
              <p className="text-sm text-zinc-400">Profile ID</p>
              <p className="text-lg font-mono tracking-wide">{params.id}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  