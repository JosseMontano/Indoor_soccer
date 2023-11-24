﻿using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Context

{
    public class DBCont: DbContext
    {
        public DBCont(DbContextOptions<DBCont> options) : base(options)
        {

        }

        // ===== MODEL =====
        public virtual DbSet<User> User { get; set; }
    }
}