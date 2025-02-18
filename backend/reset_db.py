from database.database import Base, engine

print("⚠️  Dropping all tables...")
Base.metadata.drop_all(bind=engine)  # ❌ Deletes all existing tables

print("✅  Recreating tables...")
Base.metadata.create_all(bind=engine)  # 🔄 Recreates the schema

print("🎉 Database has been reset successfully!")
# Run this script to reset the database