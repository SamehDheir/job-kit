'use client';

import { useAuth, useUserType } from '@/contexts/AuthContext';
import Avatar from '@/components/ui/Avatar';
import { Building, User, Mail, Calendar, Shield } from 'lucide-react';

export default function UserInfo() {
  const { user, isLoading } = useAuth();
  const { userType, isCompany, isUser } = useUserType();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-16 w-16 bg-gray-300 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-32"></div>
              <div className="h-3 bg-gray-300 rounded w-48"></div>
              <div className="h-3 bg-gray-300 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No user data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start space-x-4">
        <Avatar name={user.name} size="lg" className="h-16 w-16 text-lg" />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h2 className="text-xl font-semibold text-gray-900 truncate">
              {user.name || 'User'}
            </h2>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isCompany 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {isCompany ? (
                <>
                  <Building className="h-3 w-3 mr-1" />
                  Company
                </>
              ) : (
                <>
                  <User className="h-3 w-3 mr-1" />
                  Job Seeker
                </>
              )}
            </span>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="truncate">{user.email}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>
                Joined {new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-gray-400" />
              <span>Account ID: {user.id.slice(0, 8)}...</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              {isCompany ? (
                "Manage your job postings and find the best candidates for your company."
              ) : (
                "Build your professional resume and discover amazing job opportunities."
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}