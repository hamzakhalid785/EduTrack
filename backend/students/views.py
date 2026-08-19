from django.db.models import Count
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .models import Student
from .serializers import StudentSerializer


class StudentPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = "page_size"
    max_page_size = 50


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    pagination_class = StudentPagination

    def get_queryset(self):
        queryset = Student.objects.all()

        # Search
        search = self.request.query_params.get("search")

        if search:
            queryset = queryset.filter(
                name__icontains=search
            ) | queryset.filter(
                email__icontains=search
            ) | queryset.filter(
                phone__icontains=search
            )

        # Department filter
        department = self.request.query_params.get("department")

        if department and department != "all":
            queryset = queryset.filter(
                department=department
            )

        # Course filter
        course = self.request.query_params.get("course")

        if course and course != "all":
            queryset = queryset.filter(
                course__iexact=course
            )

        # Sorting
        ordering = self.request.query_params.get(
            "ordering",
            "-id"
        )

        allowed_ordering = [
            "name",
            "-name",
            "email",
            "-email",
            "age",
            "-age",
            "enrollment_date",
            "-enrollment_date",
            "id",
            "-id",
        ]

        if ordering in allowed_ordering:
            queryset = queryset.order_by(ordering)
        else:
            queryset = queryset.order_by("-id")

        return queryset

    @action(
        detail=False,
        methods=["get"],
        url_path="stats"
    )
    def stats(self, request):

        total_students = Student.objects.count()

        departments = (
            Student.objects
            .values("department")
            .annotate(total=Count("id"))
            .order_by("-total")
        )

        courses = (
            Student.objects
            .values("course")
            .annotate(total=Count("id"))
            .order_by("-total")
        )

        recent_students = (
            Student.objects
            .order_by("-id")[:5]
        )

        recent_data = StudentSerializer(
            recent_students,
            many=True
        ).data

        return Response({
            "total_students": total_students,
            "departments": list(departments),
            "courses": list(courses),
            "recent_students": recent_data,
        })