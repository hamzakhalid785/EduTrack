from django.db import models


class Student(models.Model):
    DEPARTMENT_CHOICES = [
        ("Computer Science", "Computer Science"),
        ("Software Engineering", "Software Engineering"),
        ("Information Technology", "Information Technology"),
        ("Artificial Intelligence", "Artificial Intelligence"),
        ("Data Science", "Data Science"),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    course = models.CharField(max_length=100, blank=True)
    department = models.CharField(
        max_length=100,
        choices=DEPARTMENT_CHOICES,
        blank=True,
    )
    enrollment_date = models.DateField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name
