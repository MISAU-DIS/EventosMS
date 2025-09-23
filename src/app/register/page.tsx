'use client';

import { useState } from "react";
import { motion } from 'framer-motion';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Eye, EyeOff, Lock, Mail, UserPlus, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage(): React.ReactElement {
  const [formData, setFormData] = useState<RegisterForm>({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('error');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear message when user starts typing
    if (message) setMessage('');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações básicas
    if (formData.password !== formData.confirmPassword) {
      setMessage('As senhas não coincidem');
      setMessageType('error');
      return;
    }

    if (formData.password.length < 6) {
      setMessage('A senha deve ter pelo menos 6 caracteres');
      setMessageType('error');
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      const user = userCredential.user;

      // Salvar dados extras no Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        email: user.email,
        criadoEm: new Date()
      });

      setMessage("Usuário cadastrado com sucesso!");
      setMessageType('success');
      
      // Limpar formulário
      setFormData({
        email: '',
        password: '',
        confirmPassword: ''
      });
      
    } catch (error: string | any) {
      let errorMessage = "Erro ao cadastrar usuário";
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este email já está em uso';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
          break;
        case 'auth/weak-password':
          errorMessage = 'Senha muito fraca';
          break;
        default:
          errorMessage = error.message;
      }
      
      setMessage(errorMessage);
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <title>Cadastro - Sistema MISAU</title>
      <meta name="description" content="Cadastro de usuário no sistema MISAU" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          

          {/* Formulário de Cadastro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <form onSubmit={handleRegister} className="space-y-6">
                {/* Logo e Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <div>
                <Image
                  src="/Emblem_of_Mozambique.svg"
                  alt="Emblema de Moçambique"
                  width={48}
                  height={48}
                  className="w-16 h-16"
                  priority
                />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Cadastro de Usuário
            </h1>
            <p className="text-gray-600 text-sm">
              Sistema de Gestão de Eventos - MISAU
            </p>
          </motion.div>
          
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                    placeholder="Digite seu email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                    placeholder="Digite sua senha"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                    placeholder="Confirme sua senha"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Message */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className={`border rounded-lg p-3 ${
                    messageType === 'success'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <p className={`text-sm font-medium ${
                    messageType === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {message}
                  </p>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg flex items-center justify-center ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-xl'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Cadastrando...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <UserPlus className="h-5 w-5 mr-2" />
                    Cadastrar Usuário
                  </div>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-6"
          >
            <p className="text-sm text-gray-600 mb-2">
              Já tem uma conta?{' '}
              <Link
                href="/Login"
                className="text-emerald-600 hover:text-emerald-500 font-medium"
              >
                Fazer login
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              © 2025 MISAU - Ministério da Saúde de Moçambique
            </p>
            <Link
              href="/"
              className="text-sm text-emerald-600 hover:text-emerald-500 font-medium mt-2 inline-block"
            >
              Voltar ao site principal
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  );
}














// 'use client';

// import { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from "@/lib/firebase";

// export default function RegisterPage() {
//   const [email, setEmail] = useState("");
//   const [senha, setSenha] = useState("");
//   const [mensagem, setMensagem] = useState("");

//   const handleRegister = async () => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
//       const user = userCredential.user;

//       // Salvar dados extras no Firestore
//       await setDoc(doc(db, "usuarios", user.uid), {
//         email: user.email,
//         criadoEm: new Date()
//       });

//       setMensagem("Usuário cadastrado com sucesso!");
//     } catch (error: any) {
//       setMensagem("Erro: " + error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Cadastrar usuário</h1>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       /><br />
//       <input
//         type="password"
//         placeholder="Senha"
//         value={senha}
//         onChange={(e) => setSenha(e.target.value)}
//       /><br />
//       <button onClick={handleRegister}>Cadastrar</button>
//       <p>{mensagem}</p>
//     </div>
//   );
// }
