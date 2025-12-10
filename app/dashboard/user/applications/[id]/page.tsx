"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { createApiHeaders } from "@/lib/api-utils";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  Building2,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  FileText,
  ExternalLink,
  ArrowLeft,
  Briefcase,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
} from "lucide-react";
import Button from "@/components/ui/Button";

interface JobApplication {
  id: string;
  status: string;
  coverLetter?: string;
  resumeUrl?: string;
  experience?: string;
  expectedSalary?: number;
  availableFrom?: string;
  createdAt: string;
  updatedAt: string;
  job: {
    id: string;
    title: string;
    description: string;
    location: string;
    workType: string;
    salaryMin?: number;
    salaryMax?: number;
    currency: string;
    company?: {
      companyName: string;
      location: string;
      logo?: string;
      website?: string;
    };
  };
}

const statusConfig: Record<
  string,
  { label: string; color: string; icon: any; bgColor: string }
> = {
  PENDING: {
    label: "Pending Review",
    color: "text-yellow-700",
    bgColor: "bg-yellow-100",
    icon: Clock,
  },
  REVIEWED: {
    label: "Reviewed",
    color: "text-blue-700",
    bgColor: "bg-blue-100",
    icon: Eye,
  },
  SHORTLISTED: {
    label: "Shortlisted",
    color: "text-purple-700",
    bgColor: "bg-purple-100",
    icon: CheckCircle,
  },
  INTERVIEWING: {
    label: "Interviewing",
    color: "text-indigo-700",
    bgColor: "bg-indigo-100",
    icon: Briefcase,
  },
  ACCEPTED: {
    label: "Accepted",
    color: "text-green-700",
    bgColor: "bg-green-100",
    icon: CheckCircle,
  },
  REJECTED: {
    label: "Rejected",
    color: "text-red-700",
    bgColor: "bg-red-100",
    icon: XCircle,
  },
  WITHDRAWN: {
    label: "Withdrawn",
    color: "text-gray-700",
    bgColor: "bg-gray-100",
    icon: AlertCircle,
  },
};

export default function ApplicationDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [application, setApplication] = useState<JobApplication | null>(null);
  const [loading, setLoading] = useState(true);

  const applicationId = params?.id as string;

  useEffect(() => {
    if (user && applicationId) {
      fetchApplication();
    }
  }, [user, applicationId]);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/applications/${applicationId}`, {
        headers: createApiHeaders(user),
      });

      if (response.ok) {
        const data = await response.json();
        setApplication(data.application);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to fetch application details");
        router.push("/dashboard/user/applications");
      }
    } catch (error) {
      console.error("Error fetching application:", error);
      toast.error("Failed to fetch application details");
      router.push("/dashboard/user/applications");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading application details...</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Application not found</p>
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => router.push("/dashboard/user/applications")}
          >
            Back to Applications
          </Button>
        </div>
      </div>
    );
  }

  const statusInfo = statusConfig[application.status] || statusConfig.PENDING;
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => router.push("/dashboard/user/applications")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Applications</span>
        </button>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {application.job.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600 flex-wrap">
                {application.job.company && (
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>{application.job.company.companyName}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{application.job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{application.job.workType}</span>
                </div>
              </div>
            </div>
            {application.job.company?.logo && (
              <img
                src={application.job.company.logo}
                alt={application.job.company.companyName}
                className="w-16 h-16 rounded-lg object-cover"
              />
            )}
          </div>

          {/* Status Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusInfo.bgColor}`}
          >
            <StatusIcon className={`w-5 h-5 ${statusInfo.color}`} />
            <span className={`font-medium ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </div>
        </div>

        {/* Application Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Application Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Application Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Applied On</label>
                <p className="text-gray-900 font-medium">
                  {new Date(application.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Last Updated</label>
                <p className="text-gray-900 font-medium">
                  {new Date(application.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              {application.expectedSalary && (
                <div>
                  <label className="text-sm text-gray-500">
                    Expected Salary
                  </label>
                  <p className="text-gray-900 font-medium">
                    {application.job.currency}{" "}
                    {application.expectedSalary.toLocaleString()}
                  </p>
                </div>
              )}
              {application.availableFrom && (
                <div>
                  <label className="text-sm text-gray-500">
                    Available From
                  </label>
                  <p className="text-gray-900 font-medium">
                    {new Date(application.availableFrom).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Job Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Job Details
            </h2>
            <div className="space-y-4">
              {(application.job.salaryMin || application.job.salaryMax) && (
                <div>
                  <label className="text-sm text-gray-500">Salary Range</label>
                  <p className="text-gray-900 font-medium flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    {application.job.currency}{" "}
                    {application.job.salaryMin?.toLocaleString() || "N/A"} -{" "}
                    {application.job.salaryMax?.toLocaleString() || "N/A"}
                  </p>
                </div>
              )}
              <div>
                <label className="text-sm text-gray-500">Work Type</label>
                <p className="text-gray-900 font-medium">
                  {application.job.workType}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Location</label>
                <p className="text-gray-900 font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {application.job.location}
                </p>
              </div>
              {application.job.company?.website && (
                <div>
                  <label className="text-sm text-gray-500">
                    Company Website
                  </label>
                  <a
                    href={application.job.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cover Letter */}
        {application.coverLetter && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Cover Letter
            </h2>
            <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
              {application.coverLetter}
            </div>
          </div>
        )}

        {/* Resume */}
        {application.resumeUrl && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Resume
            </h2>
            <a
              href={application.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              View Resume
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <Link href={`/jobs/${application.job.id}`}>
            <Button variant="secondary" className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              View Job Posting
            </Button>
          </Link>
          <Button
            variant="primary"
            onClick={() => router.push("/dashboard/user/applications")}
          >
            Back to Applications
          </Button>
        </div>
      </div>
    </div>
  );
}
